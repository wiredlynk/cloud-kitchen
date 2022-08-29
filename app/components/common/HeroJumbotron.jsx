import { Row, Text } from "~/components";

export function HeroJumbotron({
  title,
  heading,
  description,
  eyebrow,
  leftContent,
  rightContent,
  fullHeight,
  bgColor,
}) {
  return (
    <Row
      column={2}
      spacing="top-medium bottom-medium"
      className={fullHeight ? "md:min-h-screen	items-center" : ""}
    >
      {bgColor ? (
        <div
          className={`absolute w-1/2 left-0 top-0 bottom-0 bg-amber-400 z-0`}
        ></div>
      ) : null}
      <div>
        <div className="mb-8">
          {eyebrow ? <Text variant="overline">{eyebrow}</Text> : null}
          {title ? <Text variant="h1">{title}</Text> : null}
          {heading ? <Text variant="h2">{heading}</Text> : null}
          {description ? <Text variant="subtitle">{description}</Text> : null}
        </div>
        {leftContent}
      </div>
      {rightContent ? <div>{rightContent}</div> : null}
    </Row>
  );
}
