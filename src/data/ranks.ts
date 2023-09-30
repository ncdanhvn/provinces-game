interface Rank {
    score: number;
    title: string;
}

const Ranks: Rank[] = [
    { score: 45, title: "God!" },
    { score: 35, title: "Tầm Ngoài Vũ Trụ!" },
    { score: 27, title: "Xuất Chúng!" },
    { score: 20, title: "Quá Xuất Sắc!" },
    { score: 15, title: "Tuyệt Vời!" },
    { score: 10, title: "Xuất sắc!" },
    { score: 5, title: "Giỏi!" },
    { score: 1, title: "Khá!" },
    { score: 0, title: "Thử lại đi bạn ơi" },
];
export default Ranks;
