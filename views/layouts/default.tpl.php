<body class="page flex flex_center flex_column">
    <header class="page__header"></header>

    <main class="page__main page__container">
        <?= view('blocks/board') ?>
    </main>

    <footer class="page__footer">
        <?= view('blocks/copyrights') ?>
    </footer>

    <script src="/js/script.min.js?v=<?= time() ?>"></script>
</body>
