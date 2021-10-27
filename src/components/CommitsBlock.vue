<template >
  <div v-if="filtredCommits.length >= 1">
    <div v-for="commit in filtredCommits" :key="commit.id">
      <p class="text-gray-600 text-sm relative">
        Commits on {{ commitsDate(commit.date, "commitTitle") }}
        <img src="../assets/commit.svg"
          class="bg-white absolute top-2/4 transform -translate-y-2/4 -left-8"
          alt="commit icon"/>
      </p>
      <div class="my-4">
        <div class="border border-gray-300 rounded-md hover:bg-gray-100 py-2 px-2" >
          <p v-text="commit.message"></p>
          <div class="flex items-center">
            <!-- if author not exit: Broadcastreceiver as example -->
            <img v-if="commit.img" :src="commit.img" class="w-6 h-6 mr-1 rounded-full" alt="profile image" />
            <img v-else src="../assets/author.webp" class="w-6 h-6 mr-1 rounded-full" alt="profile image" />

            <p class="text-sm">
              <a :href="commit.url" v-text="commit.name"></a>
              <span class="text-gray-500 text-xs ml-1">
                committed on {{ commitsDate(commit.date, "secCommitDate") }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommitsBlock",

  props: ["filtredCommits"],

  methods: {
    commitsDate: function(date, param) {
      const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
      //get the date from string date
      let commitDate = new Date(date);
      //date to show
      let dateShow = `${months[commitDate.getMonth()]} ${commitDate.getDate()}`;
      let withYear = dateShow + `, ${commitDate.getFullYear()}`;
      
      if (param === "commitTitle") {
        //display the year in the commit title
        return withYear;
      } else {
        if (param == "secCommitDate" && commitDate.getFullYear() == new Date().getFullYear() ) {
          //if the year is the current year dont display it
          return dateShow;
        } else {
          return withYear;
        }
      }
    }
  }
};
</script>