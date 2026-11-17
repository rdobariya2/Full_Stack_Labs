(function () {
  const key = window.CLERK_PUBLISHABLE_KEY || "";
  const ready = key && !key.includes("REPLACE_ME") ? loadClerk() : Promise.resolve(false);

  function loadClerk() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.setAttribute("data-clerk-publishable-key", key);
      script.src = "https://cdn.jsdelivr.net/npm/@clerk/clerk-js@5/dist/clerk.browser.js";
      script.onload = async () => {
        try {
          await window.Clerk.load();
          resolve(true);
        } catch (err) {
          console.error(err);
          resolve(false);
        }
      };
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  function showAuthState(signedIn) {
    document.querySelectorAll("[data-auth-signed-in]").forEach((el) => {
      el.hidden = !signedIn;
    });
    document.querySelectorAll("[data-auth-signed-out]").forEach((el) => {
      el.hidden = signedIn;
    });
    const nameEl = document.getElementById("user-name");
    if (nameEl && signedIn && window.Clerk.user) {
      nameEl.textContent = window.Clerk.user.firstName || window.Clerk.user.primaryEmailAddress?.emailAddress || "";
    }
  }

  window.pixellAuth = {
    ready,
    isSignedIn() {
      return Boolean(window.Clerk && window.Clerk.user);
    },
    async getToken() {
      if (!window.Clerk || !window.Clerk.session) return null;
      return window.Clerk.session.getToken();
    },
    openSignIn() {
      if (window.Clerk) window.Clerk.openSignIn();
    },
    async signOut() {
      if (window.Clerk) {
        await window.Clerk.signOut();
        showAuthState(false);
      }
    },
  };

  document.addEventListener("DOMContentLoaded", async () => {
    document.querySelectorAll("[data-sign-in]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        window.pixellAuth.openSignIn();
      });
    });
    document.querySelectorAll("[data-sign-out]").forEach((el) => {
      el.addEventListener("click", async (e) => {
        e.preventDefault();
        await window.pixellAuth.signOut();
      });
    });

    const loaded = await ready;
    if (loaded) {
      showAuthState(window.pixellAuth.isSignedIn());
      window.Clerk.addListener(({ user }) => showAuthState(Boolean(user)));
    } else {
      showAuthState(false);
    }
  });
})();
