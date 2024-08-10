<template>
  <div>
    <h1>creatorView</h1>
    <div>{{ data }}</div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      data: "",
    };
  },
  created() {
    request.post('/users/test',{}).then((response) =>{
      this.data = response.data.data;
    })
    .catch((error)=>{
      console.error("Error fetching data:", error);
    })
  },
};
</script>
