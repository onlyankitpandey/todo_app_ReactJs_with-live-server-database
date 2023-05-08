import React, { Fragment, Suspense } from 'react'
import { Router, Switch, Route } from "react-router-dom";
import { routes } from "src/routes";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import toast, { Toaster } from 'react-hot-toast';
import PageLoading from 'src/component/PageLoading';
import AuthGuard from 'src/component/AuthGuard';
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function App() {
  const theme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Router history={history}>
          <RenderRoutes data={routes} />
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App;


function RenderRoutes(props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {
          props.data.map((route, i) => {
            const Component = route.component;
            const Guard = route.guard ? AuthGuard : Fragment;
            const Layout = route.layout || Fragment;
            return (
              <Route
                exact={route.exact}
                key={i}
                path={route.path}
                render={(props) => (
                  <Guard>
                    <Layout>
                      {route.routes ? (
                        <RenderRoutes data={route.routes} />
                      ) : (
                        <Component {...props} />
                      )}
                    </Layout>
                  </Guard>
                )}
              />
            )
          })
        }
      </Switch>
    </Suspense>
  )
}