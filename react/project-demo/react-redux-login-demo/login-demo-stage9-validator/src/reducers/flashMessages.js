import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from "../constants";
// 生成随机id
import shortid from "shortid";
import findIndex from "lodash/findIndex";
const flashMessages = (state = [], action) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      // 三大原则，state不可以被直接改变
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        },
      ];
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      return state;
  }
};
export default flashMessages;
