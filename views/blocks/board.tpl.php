<div class="board flex flex_center flex_column" id="board">
    <header class="board__controls flex flex_between">
        <button id="board-action" class="inherit button board__control board__control_action" disabled>Loading</button>
        <div class="flex board__grid" id="board-control-size">
            <button class="inherit button button_outline button_left board__control board__control_size" disabled>24x18</button>
            <button class="inherit button button_outline button_center board__control board__control_size" disabled>32x32</button>
            <button class="inherit button button_outline button_right board__control board__control_size" disabled>48x32</button>
        </div>
        <div id="board-score" class="board__score">
            <label class="board__score-label" for="board-score-value">Score:</label>
            <input class="inherit board__score-value" id="board-score-value" type="number" readonly>
        </div>
    </header>
    <canvas class="board__canvas" id="board-canvas" width="400" height="400"></canvas>
    <footer class="board__details"></footer>
</div>
