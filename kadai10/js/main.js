$(function(){
    // ハンバーガーメニューの開閉
    $('.hamburger').click(function(){
        $(this).toggleClass('active');$("#index_head .navi").toggleClass('active');
    });

    $('.navi a').click(function(){$(".hamburger").removeClass('active');
        $("#index_head .navi").removeClass('active');
    });

    // ==========================================
    // ブログ一覧のページネーション処理（1ページ10件）
    // ==========================================
    const $blogGrid =$('#blog-grid');
    
    // ブログページが存在する場合のみ実行
    if ($blogGrid.length > 0) {
        const itemsPerPage = 10; // 1ページあたりの表示件数
        const $cards =$blogGrid.find('.memo-card');
        const totalItems = $cards.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const $pagination =$('#pagination');

        // 投稿が10件以下の場合はページネーションを非表示にして終了
        if (totalItems <= itemsPerPage) {
            $pagination.hide();
        } else {
            // 指定したページ番号の記事を表示する関数
            function showPage(page) {
                $cards.hide(); // 一旦すべてのカードを非表示
                
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                
                // 対象範囲のカードだけを表示
                $cards.slice(start, end).fadeIn(300);

                // ページネーションのボタン生成・更新
                updatePaginationUI(page);
            }

            // ページネーションUIの生成・更新関数
            function updatePaginationUI(currentPage) {
                $pagination.empty(); // 一旦クリア

                // 「前へ」ボタン
                if (currentPage > 1) {
                    $pagination.append(`<a href="#" class="prev" data-page="${currentPage - 1}">&laquo; 前へ</a>`);
                }

                // ページ番号ボタン
                for (let i = 1; i <= totalPages; i++) {
                    if (i === currentPage) {
                        $pagination.append(`<span class="page-number active">${i}</span>`);
                    } else {
                        $pagination.append(`<a href="#" class="page-number" data-page="${i}">${i}</a>`);
                    }
                }

                // 「次へ」ボタン
                if (currentPage < totalPages) {
                    $pagination.append(`<a href="#" class="next" data-page="${currentPage + 1}">次へ &raquo;</a>`);
                }
            }

            // 初期表示（1ページ目）
            showPage(1);

            // ページ切替のクリックイベント
            $pagination.on('click', 'a', function (e) {
                e.preventDefault();
                const targetPage = parseInt($(this).data('page'), 10);
                
                showPage(targetPage);

                // ページ切り替え時にブログ一覧の上部へスムーズスクロール
                $('html, body').animate({
                    scrollTop: $blogGrid.offset().top - 100
                }, 400);
            });
        }
    }
});

// ==========================================
// トップページのロード点線描画 ＆ カード表示アニメーション
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.portfolio-road');
    const svg = document.querySelector('.road-svg');
    const path = document.querySelector('.road-path');
    const cards = document.querySelectorAll('.reveal-card');

    function drawRoad() {
        if (!section || !svg || !path || !cards.length) {
            return;
        }
        const sectionRect = section.getBoundingClientRect();
        const sectionWidth = section.clientWidth;
        const sectionHeight = section.scrollHeight;
        svg.setAttribute('viewBox', '0 0 ' + sectionWidth + ' ' + sectionHeight);
        svg.setAttribute('width', sectionWidth);
        svg.setAttribute('height', sectionHeight);
        const points = Array.from(cards).map(function (card) {
            const rect = card.getBoundingClientRect();
            return {
                x: rect.left - sectionRect.left + rect.width / 2,
                y: rect.top - sectionRect.top + rect.height / 2
            };
        });
        if (points.length < 2) {
            return;
        }
        let d = 'M ' + points[0].x + ' ' + points[0].y;
        for (let i = 0; i < points.length - 1; i++) {
            const current = points[i];
            const next = points[i + 1];
            const middleY = (current.y + next.y) / 2;
            d += ' C ' + current.x + ' ' + middleY + ', ' + next.x + ' ' + middleY + ', ' + next.x + ' ' + next.y;
        }
        path.setAttribute('d', d);
    }

    drawRoad();
    window.addEventListener('load', drawRoad);
    window.addEventListener('resize', drawRoad);

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.25
        }
    );

    cards.forEach(function (card) {
        observer.observe(card);
    });
});