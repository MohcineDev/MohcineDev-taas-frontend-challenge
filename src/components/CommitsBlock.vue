<template >
  <div v-if="filtredCommits.length >= 1">
    <div v-for="commit in filtredCommits" v-bind:key="commit.id">
      <p class="text-gray-600 text-sm relative">
        Commits on {{ commitsDate(commit.date, "commitTitle") }}
        <img
          src="../assets/commit.svg"
          class="bg-white absolute top-2/4 transform -translate-y-2/4 -left-8"
          alt="commit icon"
        />
      </p>
      <div class="my-4">
        <div
          class="border border-gray-300 rounded-md hover:bg-gray-100 py-2 px-2"
        >
          <p>{{ commit.message }}</p>
          <div class="flex items-center">
            <img
              v-bind:src="commit.img"
              class="w-6 h-6 mr-1 rounded-full"
              alt="profile image"
            />
            <p class="text-sm">
              <a v-bind:href="commit.url">{{ commit.name }}</a>
              <span class="text-gray-500 text-xs ml-1">
                committed on
                {{ commitsDate(commit.date, "secCommitDate") }}</span
              >
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

      let commitDate = new Date(date);
      let dateShow = `${months[commitDate.getMonth()]} ${commitDate.getDate()}`;
      let withYear = dateShow + `, ${commitDate.getFullYear()}`;
      if (param === "commitTitle") {
        return withYear;
      } else {
        if (
          param == "secCommitDate" &&
          commitDate.getFullYear() == new Date().getFullYear()
        ) {
          return dateShow;
        } else {
          return withYear;
        }
      }
    }
  }
};
</script>