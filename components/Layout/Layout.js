import Header from "../Header/Header"

export default function Layout({children}) {
  return (
    <main className="bg-bg_primary">
        <Header/>
        {children}
    </main>
  )
}
