<script>
</script>

<section class="auth-container">
  <header>
    <div class="logo-wrapper">
      <img src="/statics/images/icons/logo.ico" alt="" />
      <span>hermes playlist</span>
    </div>
  </header>

  <div class="signin-container">
    <div class="signin-form-wrapper">
      <form class="signin-form">
        <input type="email" name="" id="" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button>SIGN IN</button>
      </form>
    </div>
    <div class="or-wrapper">
      <span>or</span>
    </div>
    <div class="oauth-btns">
      <button
        class="btn google-oauth-btn"
        onclick="location.href = '/auth/google'"
      >
        <i class="fa-brands fa-google" />
        <span>sign in with google</span>
      </button>
      <button
        class="btn facebook-oauth-btn"
        onclick="location.href = '/auth/facebook'"
      >
        <i class="fa-brands fa-facebook-f" />
        <span>sign in with facebook</span>
      </button>

      <button
        class="btn amazon-oauth-btn"
        onclick="location.href = '/auth/amazon'"
      >
        <i class="fa-brands fa-amazon" />
        <span>sign in with amazon</span>
      </button>
      <button
        class="btn kakao-oauth-btn"
        onclick="location.href = '/auth/kakao'"
      >
        <i class="fa-solid fa-comment" />
        <span>sign in with kakao</span>
      </button>
    </div>
  </div>

  <div class="signup-container">
    <!---->
  </div>
</section>

<style lang="scss">
  section.auth-container {
    font-size: 12px;
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 70%;
    padding: 1em;
    header {
      margin: 2em 0;
      .logo-wrapper {
        display: flex;
        align-items: center;
        img {
          width: 3em;
          margin-right: 1em;
        }
        span {
          color: var(--font-color);
          font-size: 1.3em;
        }
      }
    }

    > * {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .signin-container {
      display: grid;
      justify-content: center;
      grid-template-rows: 2fr 1fr 2fr;

      .signin-form-wrapper {
        .signin-form {
          display: flex;
          flex-direction: column;
          gap: 1em;
          input {
            background-color: var(--bg-sub-color);
            color: var(--font-color);
          }
          button {
            background-color: var(--sig);
            color: var(--font-color);
          }
        }
      }
      .or-wrapper {
        color: var(--font-color);

        text-align: center;
      }
      .oauth-btns {
        display: flex;
        flex-direction: column;
        gap: 1em;
        button {
          width: 100%;
          display: flex;
          align-items: center;
          i {
            flex-basis: 5%;
            font-size: 1.3em;
            margin-right: 1em;
          }
          span {
            flex-basis: 95%;
          }
        }
        .google-oauth-btn {
          background-color: #db4437;
          color: var(--font-color);
        }
        .facebook-oauth-btn {
          background-color: #4267b2;
          color: var(--font-color);
        }
        .amazon-oauth-btn {
          background-color: #ff9900;
          color: var(--font-color);
        }
        .kakao-oauth-btn {
          background-color: #ffe812;
        }
      }
    }
  }
</style>
