import Header from "../Header/Header"
import {bg_primary} from '../../globals/colors.ts';

export default function Layout({children}) {
  return (
    <main className={`relative h-[200vh] bg-[black]`}>
        <Header/>
        {children}
    </main>
  )
}
