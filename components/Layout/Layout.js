import Header from "../Header/Header"

export default function Layout({children}) {
  return (
    <main>
        <Header/>
        {children}
    </main>
  )
}
