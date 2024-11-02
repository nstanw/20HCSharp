import { Route, BrowserRouter as Routers, Routes } from "react-router-dom";
import { appRouters, userRouter } from "./router.config";
import AppLayout from "../Layout/AppLayout";
import UserLayout from "../Layout/UserLayout";

const Router = () => {
    return (
        <Routers>
            <Routes>
                {userRouter.map((route: any, idx: any) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={`userRoute ${idx}`}
                            path={route.path}
                            element={
                                <UserLayout>
                                    <Page />
                                </UserLayout>
                            }
                        />
                    );
                })}
                {appRouters.map((route: any, idx: any) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={`appRoutes ${idx}`}
                            path={route.path}
                            element={
                                <AppLayout>
                                    <Page />
                                </AppLayout>
                            }
                        />
                    );
                })}
            </Routes>
        </Routers>
    );
};

export default Router;
