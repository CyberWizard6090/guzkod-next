import { blocks } from '../model/blockList';
type Props = {
  layout: any;
};

export const RenderBlocks = ({ layout }: Props) => {
  return (
    <>
      {layout &&
        layout?.map((block: { blockType: string }, i: number) => {
          const Block = blocks[block.blockType];

          if (Block) {
            return <Block key={i} {...block} />;
          }
          return null;
        })}
    </>
  );
};
