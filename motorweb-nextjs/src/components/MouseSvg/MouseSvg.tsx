import { motion } from 'motion/react'

//固定显示在视口右下角的动态鼠标svg
const MouseSvg = () => {
    const scrollToTop = () => {
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
            // 兼容性回退
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    };

    return (
        <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fixed bottom-1/25 right-1/25 transform translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-in-out opacity-70 hover:opacity-100 hover:transform hover:scale-110"
            onClick={scrollToTop}
            role="button"
            aria-label="返回页面顶部"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToTop();
                }
            }}
        >
            <path
                d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
                stroke="var(--text)"
                strokeWidth="1"
            />
            <motion.path
                animate={{ y: [0, 5] }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                }}
                d="M12 5V8"
                stroke="var(--text)"
                strokeWidth="1"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default MouseSvg