import { blocks } from '../model/blockList';

type BlockType = keyof typeof blocks;

type Props = {
  layout: Array<{ blockType: BlockType } & Record<string, any>>;
};

export const RenderBlocks = ({ layout }: Props) => {
  return (
    <>
      {layout &&
        layout.map((block, i) => {
          const Block = blocks[block.blockType];

          if (Block) {
            return <Block key={i} {...block} />;
          }
          return null;
        })}
    </>
  );
};
