import React from "react"
import Header from "./components/Header"
import Meme from "./components/Meme"
import Footer from "./components/Footer";
import "./App.css"

export default function App() {
  return (
      <div>
        <Header />
        <Meme />
        <Footer/>
      </div>
  )
}