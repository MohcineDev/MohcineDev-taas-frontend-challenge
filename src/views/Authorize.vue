<template>
  <div class="flex items-center h-screen justify-center">
    <!-- <router-link to="https://github.com/login/oauth/authorize"> Authorize my Github account </router-link> -->
    <a
      class="text-white bg-blue-500 rounded-md py-4 px-3"
      href="https://github.com/login/oauth/authorize?client_id=104a6612b93e86b46f37"
    >
      Authorize my Github account
    </a>
  </div>
</template>
<script>
//104a6612b93e86b46f37
export default {
  name: "Authorize",
  components: {}
};
</script>

 <style scoped>
/* .authorize{
  display: flex; 
  align-items: center;
  justify-content: center;
  height: 90vh;
} */
/* a{
  background:#428bca;
  color: #fff;
  border-radius: 5px;
  padding: 15px 10px;
  text-decoration: none; 
}
  */

</style>