import Navbar from "../components/navbar";
import ToDo from "../components/todo";

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <h1>Home Page</h1>
            <ToDo />
        </div>
    );
}