<template>
  <div>
    <div class="profile flex justify-end mb-8 mt-4 w-11/12 mx-auto items-center" >
      <a href="https://github.com/MohcineDev" target="_blank" class="text-lg">Mohcine Dev</a>
      <img
        src="../assets/git.jpg"
        class="w-8 h-8 rounded-full ml-4"
        alt="github profile avatar"
      />
    </div>
    <AuthorizedMsg v-if="authorizedMsg" msgType="authorize" @close="removeMsg" />
    <section class="mt-8 flex w-10/12 m-auto">
      <form @submit.prevent="listCommits()" class="flex-shrink-0">
        <input @change="listCommits()" type="text" list="repos" placeholder="Searching by name" v-model="repoName" class="border border-gray-300 p-0.5 outline-none text-sm rounded mr-1" />
        <datalist id="repos">
          <option
            v-for="(repo, index) in filterRepos"
            :key="index"
            :value="repo"
          />
        </datalist>
        <select class="border border-gray-300 p-1 rounded outline-none text-sm">
          <option value="name">name</option>
        </select>
      </form>
      <main v-if="this.commits.length" class="border border-gray-300 flex-grow p-6 ml-4 rounded-sm" >
        <h1 class="text-2xl" v-text="repoName"></h1>
        <form>
          <select class=" bg-gray-100 border border-gray-300 rounded p-1 text-sm mt-2 mb-5 cursor-pointer">
            <option
              v-for="(branche, index) in branches"
              :key="index"
              :value="branche.name"
              v-text="branche.name"
            ></option>
          </select>
        </form>
        <div class="border-l border-gray-300 pl-6">
          <div>
            <CommitsBlock :filtredCommits="getFiltredCommits" />
          </div>
        </div>
      </main>
      <main v-else class="self-center text-center flex-grow">
        <p class="capitalize">enter a repository name</p>
      </main>
    </section>
  </div>
</template>

<script>
import AuthorizedMsg from "../components/AuthorizedMsg.vue";
import CommitsBlock from "../components/CommitsBlock.vue";

export default {
  data() {
    return {
      authorizedMsg: true,
      repoName: null,
      repos: [],
      commits: [],
      branches: []
    };
  },
  name: "Home",
  components: {
    CommitsBlock,
    AuthorizedMsg
  },
  methods: {
    //remove authorizedMsg component
    removeMsg: function() {
      this.authorizedMsg = !this.authorizedMsg;
    },
    //get repos and fill the datalist
    listCommits: async function() {
      this.commits = [];

      this.getCommits();
      this.getBranches();
    },
    //get repo commits
    getCommits: async function() {
      try {
        if (this.filterRepos.includes(this.repoName)) {
          const allCommits = await fetch(`https://api.github.com/repos/MohcineDev/${this.repoName}/commits`);
          const response = await allCommits.json();
          this.commits = response;
        }
      } catch (error) {
        console.log(error);
      }
    },

    getBranches: async function() {
      //get repo branches
      try {
        if (this.filterRepos.includes(this.repoName)) {
          const data = await fetch(`https://api.github.com/repos/MohcineDev/${this.repoName}/branches`);
          const res = await data.json();
          this.branches = res;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getRepos: async function() {
      try {
        const data = await fetch("https://api.github.com/users/MohcineDev/repos");
        const res = await data.json();
        this.repos = res;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    getFiltredCommits() {
      let filtredCommits = [];
      for (let i = 0; i < this.commits.length; i++) {
        let commitObj = {};

        commitObj.id = this.commits[i].node_id;
        commitObj.date = this.commits[i].commit.author.date;
        commitObj.name = this.commits[i].commit.author.name;
        commitObj.message = this.commits[i].commit.message;

        //if author exist: Broadcastreceiver as example
        if (this.commits[i].author != null) {
          commitObj.img = this.commits[i].author.avatar_url;
          commitObj.url = this.commits[i].author.html_url;
        }

        filtredCommits.push(commitObj);
      }
      return filtredCommits;
    },
    filterRepos() {
      //use only repo name
      let reposName = [];
      this.repos.forEach(repo => {
        reposName.push(repo.name);
      });
      return reposName;
    }
  },
  mounted() {
    //get all the repos and fill the datalist
    this.getRepos();
  }
};
</script>
