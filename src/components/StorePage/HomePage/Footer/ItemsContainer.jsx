import Item from "./Item";
import { INTRODUCTION, ADDRESS, COMPANY, SUPPORT } from "./Menus";
const ItemsContainer = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
            <Item Links={INTRODUCTION} title="THÔNG TIN CHUNG" />
            <Item Links={ADDRESS} title="ĐỊA CHỈ " />
            <Item Links={COMPANY} title="LIÊN HỆ HỖ TRỢ " />
            <Item Links={SUPPORT} title="LIÊN HỆ HỖ TRỢ" />
        </div>
    );
};

export default ItemsContainer;