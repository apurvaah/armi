import './style.css'

const Home = () => {
    return (
        <div>
            <div id="hs">
                <a class="high-score" href="scores.html">High Scores</a>
            </div>

            <div class="timer">Timer: 0</div>

            <div id="container">
                <h1 id="header"></h1>
                <div id="text">
                </div>
                <button class="text-white button hide" id="start-button" type="button">Start Game</button>
                <div id="result"></div>
            </div>
        </div>
    );
};

export default Home;