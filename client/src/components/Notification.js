import React from "react";

const Notification = ({ message, type }) => {
    const styles = {
        color: type === "error" ? "red" : "green",
        padding: "10px",
        border: `1px solid ${type === "error" ? "red" : "green"}`,
        margin: "10px 0",
    };

    return <div style={styles}>{message}</div>;
};

Notification.show = (message, type = "success") => {
    alert(message);
};

export default Notification;
