<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(handleRegister)">
          <ValidationProvider
            name="username"
            rules="required|min:3|max:20"
            v-slot="{ errors }"
          >
            <label for="username">Username</label>
            <input v-model="user.username" type="text" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            name="email"
            rules="required|email|max:50"
            v-slot="{ errors }"
          >
            <label for="email">Email</label>
            <input v-model="user.email" type="email" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <ValidationProvider
            name="password"
            rules="required|min:6|max:40"
            v-slot="{ errors }"
          >
            <label for="password">Password</label>
            <input v-model="user.password" type="password" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider>

          <button type="submit">Sign Up</button>
        </form>
      </ValidationObserver>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/models/user";

export default {
  name: "Register",

  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.$router.push("/profile");
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
