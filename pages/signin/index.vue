<template>
  <v-card width="500px" class="mx-auto ma-5" justify="center">
    <v-toolbar color="primary">
      <v-toolbar-title>SignIn</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="email"
          prepend-icon="mdi-email"
          :rules="emailRules"
          label="Email address"
          clearable
        />
        <v-text-field
          v-model="password"
          prepend-icon="mdi-lock"
          :type="passwordType"
          :append-icon="passwordIcon"
          :rules="passwordRules"
          label="Password"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="signIn"
      >
        ログイン
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      emailRules: [
        v => !!v || 'メールアドレスを入力してください',
        v => /.+@.+\..+/.test(v) || 'メールアドレスを入力してください'
      ],
      passwordRules: [
        v => !!v || 'パスワードを入力してください',
        v => (v && v.length >= 8) || '8文字以上のパスワードを入力してください'
      ],
      email: '',
      password: '',
      setEmail: '',
      setPassword: '',
      showPassword: false
    }
  },
  head: {
    title: 'SignUp'
  },
  computed: {
    passwordType () {
      return this.showPassword ? 'text' : 'password'
    },
    passwordIcon () {
      return this.showPassword ? 'mdi-eye' : 'mdi-eye-off'
    }
  },
  methods: {
    signIn () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signIn', user)
    }
  }
}
</script>
