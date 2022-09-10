import './style.css'

const Home = () => {
    return (
        <div>
            <div id="header">
                <h1>Play Me!</h1>
            </div>

            <div class="timer hide">Timer: 0</div>

            <div id="container">
                <h1 id="header"></h1>
                <div id="text">
                </div>
                <button class="text-white button" id="start-button" type="button">Start Game</button>
                <div id="result"></div>
            </div>
        </div>
    );
};

export default Home;