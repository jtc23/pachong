import { Typography } from "antd";
import type { TextProps } from "antd/lib/typography/Text";
const { Text } = Typography;

interface EllipsisTextProps extends TextProps {
    text?: string;
    children?: React.ReactNode;
}

const EllipsisText = (props: EllipsisTextProps) => {
    const { text, children } = props;
    let content = text || children;
    return (
        <Text
            ellipsis={{
                tooltip: true,
            }}
            style={{
                width: "95%",
                ...props.style,
            }}
        >
            {text || children}
        </Text>
    );
};

export default EllipsisText;
