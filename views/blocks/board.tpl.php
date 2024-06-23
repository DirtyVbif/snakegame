<div class="board flex flex_center flex_column" id="board">
    <header class="board__controls">
        <button id="board-action" class="board__control board__control_play" disabled>Loading</button>
        <div id="board-score" class="board__score">
            <label class="board__score-label">Score:</label>
            <input class="board__score-value" type="number" readonly>
        </div>
    </header>
    <canvas class="board__canvas" id="board-canvas" width="400" height="400"></canvas>
    <footer class="board__details"></footer>
</div>
