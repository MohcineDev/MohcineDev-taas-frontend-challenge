<template>
  <div class="bg-gray-600 h-screen">
    <div
      class="profile flex justify-end mb-8 mt-4 w-11/12 mx-auto items-center"
    >
      <a href="https://github.com/MohcineDev" target="_blank" class="text-lg"
        >Mohcine Dev</a
      >
      <img src="../assets/git.jpg" class="w-8 h-8 rounded-full ml-4" alt="" />
    </div>
    <AuthorizedMsg msgType="authorize"/>
    <section class="mt-8 flex w-10/12 m-auto">
      <form v-on:submit.prevent="listCommits()" class="flex-shrink-0">
        <input
          v-on:change="listCommits()"
          type="text"
          list="repos"
          placeholder="Searching by name"
          id="repo-name"
          class="border border-gray-300 p-0.5 outline-none text-sm rounded mr-1"
        />
        <datalist id="repos">
          <option
            v-for="repo in repos"
            v-bind:key="repo.id"
            v-bind:value="repo.name"
          />
        </datalist>
        <select class="border border-gray-300 p-1 rounded outline-none text-sm">
          <option value="name">name</option>
        </select>
      </form>
      <main
        v-if="this.commits.length"
        class="border border-gray-300 flex-grow p-6 ml-4 rounded-sm"
      >
        <h1 class="text-2xl">
          {{ repoName }}
        </h1>
        <form action="">
          <select
            class="
              bg-gray-100
              border border-gray-300
              rounded
              p-1
              text-sm
              mt-2
              mb-5
              cursor-pointer
            "
          >
            <option
              v-for="(branche, index) in branches"
              v-bind:key="index"
              v-bind:value="branche.name"
            >
              {{ branche.name }}
            </option>
          </select>
        </form>
        <div class="border-l border-gray-300 pl-6">
          <div>
            <CommitsBlock v-bind:filtredCommits="filtredCommits" />
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
      repoName: null,
      repos: [],
      commits: [],
      filtredCommits: [],
      branches: []
    };
  },
  name: "Home",
  components: {
    CommitsBlock,
    AuthorizedMsg
  },
  methods: {
    //get repos and fill the datalist
    listCommits: async function() {
      this.repoName = document.querySelector("#repo-name").value;
      this.commits = [];

      this.getCommits();
      this.getBranches();
    },
    getCommits: async function() {
      //get repo commits
      const allCommits = await fetch(
        `https://api.github.com/repos/MohcineDev/${this.repoName}/commits`
      );
      const response = await allCommits.json();
      this.commits = response;

      this.filtredCommitsArray();
    },

    getBranches: function() {
      //get repo branches
      fetch(`https://api.github.com/repos/MohcineDev/${this.repoName}/branches`)
        .then(res => res.json())
        .then(data => (this.branches = data))
        .catch(err => console.log(err));
    },
    filtredCommitsArray: function() {
      for (let i = 0; i < this.commits.length; i++) {
        let commitObj = {};

        commitObj.id = this.commits[i].node_id;
        commitObj.date = this.commits[i].commit.author.date;
        commitObj.name = this.commits[i].commit.author.name;
        commitObj.message = this.commits[i].commit.message;

        //if author exist Broadcastreceiver as example
        if (this.commits[i].author != null) {
          commitObj.img = this.commits[i].author.avatar_url;
          commitObj.url = this.commits[i].author.html_url;
        } else {
          commitObj.img =
            "https://camo.githubusercontent.com/3923b83a33f7a6f8ad3b7549976e1b53097151463ddc9b3a934f9725e69c207f/68747470733a2f2f302e67726176617461722e636f6d2f6176617461722f36383662336361313031663233313638383433313836313965386130643630363f643d68747470732533412532462532466769746875622e6769746875626173736574732e636f6d253246696d6167657325324667726176617461727325324667726176617461722d757365722d3432302e706e6726723d6726733d3634";
        }

        this.filtredCommits[i] = commitObj;
      }
    }
  },
  mounted() {
    //get all the repos and fill the datalist
    // fetch("https://api.github.com/users/MohcineDev/repos")
    //   .then(res => res.json())
    //   .then(data => (this.repos = data))
    //   .catch(err => console.log(err));
  }
};
</script>
