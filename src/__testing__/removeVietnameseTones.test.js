import { expect } from "chai";
import { removeVietnameseTones } from "../utils/removeVietnameseTones"
// const expert = chai.expert
describe("Test removeVietnameseTones function", () => {
    it("should be all list book if input is empty", () => {
        // const listBook = [{
        //     title: "Tự truyện", image: "", description: "Tự truyện của bình", author: "Nguyễn Bình"
        // }, {
        //     title: "Trinh thám", image: "", description: "Trinh thám mạo hiểm", author: "Emma Lee"
        // }, {
        //     title: "Truyện cười", image: "", description: "Truyện xàm xí đú", author: "Thanh Lê"
        // }]
        const input = "Nguyễn Đoàn Xuân Bình"
        const result = removeVietnameseTones(input)
        expect(result).to.equal(value);
    })
})
