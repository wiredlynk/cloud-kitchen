import { Row, Text, FormattedMessage } from "~/components";

export const Footer = () => (
  <footer role="contentinfo">
    <Row spacing="top-small bottom-small">
      <Text variant="body2">
        <FormattedMessage id="copyright" />
      </Text>
    </Row>
  </footer>
);
