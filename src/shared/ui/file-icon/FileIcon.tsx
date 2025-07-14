import Word from 'shared/assets/svg/SVG-DOCS-ICONS/word-document-svgrepo-com.svg';
import Excel from 'shared/assets/svg/SVG-DOCS-ICONS/excel-document-svgrepo-com.svg';
import Powerpoint from 'shared/assets/svg/SVG-DOCS-ICONS/ppt-document-svgrepo-com.svg';
import PDF from 'shared/assets/svg/SVG-DOCS-ICONS/pdf-document-svgrepo-com.svg';
import FileUnknown from 'shared/assets/svg/SVG-DOCS-ICONS/unknown-document-svgrepo-com.svg';
import Xml from 'shared/assets/svg/SVG-DOCS-ICONS/xml-document-svgrepo-com.svg';
import Zip from 'shared/assets/svg/SVG-DOCS-ICONS/zip-document-svgrepo-com.svg';
import VideoIcon from 'shared/assets/svg/SVG-DOCS-ICONS/video-document-svgrepo-com.svg';
import AudioIcon from 'shared/assets/svg/SVG-DOCS-ICONS/audio-document-svgrepo-com.svg';
import Txt from 'shared/assets/svg/SVG-DOCS-ICONS/txt-document-svgrepo-com.svg';
import { FormatFile } from 'shared/consts';

type Props = {
  fileType: string;
};

export const FileIcon = ({ fileType }: Props) => {
  if (FormatFile.word.includes(fileType)) return <Word />;
  if (FormatFile.excel.includes(fileType)) return <Excel />;
  if (FormatFile.powerpoint.includes(fileType)) return <Powerpoint />;
  if (FormatFile.zip.includes(fileType)) return <Zip />;
  if (FormatFile.video.includes(fileType)) return <AudioIcon />;
  if (FormatFile.music.includes(fileType)) return <VideoIcon />;
  if (fileType === 'pdf') return <PDF />;
  if (fileType === 'xml') return <Xml />;
  if (fileType === 'txt') return <Txt />;
  return <FileUnknown />;
};
