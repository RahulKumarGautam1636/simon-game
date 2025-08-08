export const AuthLayout = ({ children, history }) => {
    
    // history.push('/companySelection');

    return (
        <>
            {children}
        </>
    )

};


// Example taken from https://www.youtube.com/watch?v=U43uEoMrp-s

// const pages = [
//     { exact: true, path: '/login', component: LoginPage, layout: AuthLayout },
//     { exact: false, path: '/dashboard', component: DashboardPage, layout: Layout },
// ]

// const App = () => {
//     return (
//         <Router history={history}>
//             <Swith>
//                 {pages.map((i, n) => {
//                     <Route 
//                         key={n} 
//                         exact={i.exact} 
//                         path={i.path} 
//                         render={props => (
//                             <i.layout history={props.history}>
//                                 <i.component {...props} />
//                             </i.layout>
//                         )
//                     }>
//                     </Route>
//                 })}
//             </Swith>
//         </Router>
//     )
// }