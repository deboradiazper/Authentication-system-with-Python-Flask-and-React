const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      user: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      loadUser: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user");
        const data = await response.json();
        console.log(data);
        return true;
      },
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            opts
          );
          if (resp.status != 200) {
            return false;
          }

          const data = await resp.json();
          console.log(data.user);
          setStore({
            user: data.user.name,
          });
          setStore({
            userInfo: data.user,
          });

          localStorage.setItem("user", data.user.name);

          console.log(data.token);
          setStore({
            auth: true,
          });
          localStorage.setItem("token", data.token);
          setStore({
            token: data.token,
          });
          const actions = getActions();
          actions.loadToprecipe();
          actions.loadRecipe();
          return true;
        } catch (error) {
          console.error("there has been an error login in");
        }
      },
      setToken: (token, user) => {
        console.log(token, user);
        setStore({
          token: token,
        });
        setStore({
          user: user,
        });
      },
      logout: () => {
        setStore({
          token: null,
        });
        setStore({
          auth: false,
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        const actions = getActions();
        const recipesResult = actions.loadRecipe();
        const recipesTop = actions.loadToprecipe();
        if (recipesTop && recipesResult) {
          return true;
        }
        return false;
      },
    },
  };
};

export default getState;
