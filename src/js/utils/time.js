import { Timestamp } from "../db/firestore";
import moment from "moment";

export const createTimestamp = () => {
	return Timestamp.now().toMillis().toString();
};

export const formatTimestamp = (timestamp) => {
	return moment(parseInt(timestamp, 10)).fromNow();
};
