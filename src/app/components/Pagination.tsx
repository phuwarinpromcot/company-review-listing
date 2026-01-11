"use client";

import React from "react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxPagesToShow?: number;
};

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxPagesToShow = 5,
}) => {
    if (totalPages <= 1) return null;

    const pages: (number | "...")[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const showLeftEllipsis = startPage > 2;
    const showRightEllipsis = endPage < totalPages - 1;

    const buttonBaseClasses =
        "w-7 h-7 flex items-center justify-center rounded border border-[var(--primary)] text-[var(--primary)]";

    const activeClasses = "bg-[var(--primary)] text-white";

    return (
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`${buttonBaseClasses} disabled:border-zinc-200 disabled:bg-white disabled:text-zinc-200  hover:bg-[var(--primary-100)]`}
            >
                &lt;
            </button>

            {startPage > 1 && (
                <button
                    onClick={() => onPageChange(1)}
                    className={`${buttonBaseClasses} ${currentPage === 1 ? activeClasses : "bg-white text-[var(--primary)] hover:bg-[var(--primary-100)]"
                        }`}
                >
                    1
                </button>
            )}

            {showLeftEllipsis && <span className="px-2 text-[var(--primary)]">...</span>}

            {pages.map((page) =>
                page !== "..." && (
                    <button
                        key={page}
                        onClick={() => onPageChange(page as number)}
                        className={`${buttonBaseClasses} ${currentPage === page
                                ? activeClasses
                                : "bg-white text-[var(--primary)] hover:bg-[var(--primary-100)]"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}


            {showRightEllipsis && <span className="px-2 text-[var(--primary)]">...</span>}

            {endPage < totalPages && (
                <button
                    onClick={() => onPageChange(totalPages)}
                    className={`${buttonBaseClasses} ${currentPage === totalPages ? activeClasses : "bg-white text-[var(--primary)]"
                        }`}
                >
                    {totalPages}
                </button>
            )}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`${buttonBaseClasses} disabled:border-zinc-200 disabled:bg-white disabled:text-zinc-200 hover:bg-[var(--primary-100)]`}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
