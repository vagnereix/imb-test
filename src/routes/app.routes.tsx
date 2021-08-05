import { Redirect, Route, Switch } from "react-router-dom";

import { BookList } from "../components/BookList";

import { Header } from "../components/Header";

export function AppRoutes() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/books/list" exact component={BookList} />
        <Redirect from="*" to="/books/list" />
      </Switch>
    </>
  );
}
