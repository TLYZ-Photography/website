document.addEventListener('DOMContentLoaded', function () {
    const slideshowItems = document.querySelectorAll('.slideshow-item');

    slideshowItems.forEach(function (item) {
        const img = item.querySelector('.slideshow-image');
        if (!img) return;

        try {
            const photos = JSON.parse(item.getAttribute('data-photos'));
            if (!Array.isArray(photos) || photos.length === 0) return;

            // 获取当前图片文件名（不含路径）
            const currentFilename = img.src.split('/').pop();
            let currentIndex = photos.indexOf(currentFilename);
            if (currentIndex === -1) currentIndex = 0; // 默认从第一张开始

            img.addEventListener('click', function () {
                // 淡出
                img.style.opacity = '0';

                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % photos.length;
                    img.src = 'photos/' + photos[currentIndex]; // 注意路径
                    img.style.opacity = '1';
                }, 400); // 与 CSS transition 时间一致
            });
        } catch (e) {
            console.error('Invalid data-photos in:', item, e);
        }
    });
});