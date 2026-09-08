import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <header>
                <nav>
                    ...
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                ...
            </footer>
        </>
    )
}

export default Layout;