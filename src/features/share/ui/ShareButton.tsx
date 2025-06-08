'use client';

import { Button } from 'shared/ui/button';
import ShareIcon from 'shared/assets/svg/bootstrap-icons-1.11.2/share.svg';
type Props = {
  title: string;
  url?: string;
};

export const ShareButton = ({ title, url }: Props) => {
  const handleShare = async () => {
    const shareUrl = url ?? window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (error) {
        console.error('Ошибка при попытке поделиться:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Ссылка скопирована в буфер обмена!');
      } catch (error) {
        console.error('Не удалось скопировать ссылку:', error);
      }
    }
  };

  return (
    <Button Icon={ShareIcon} onClick={handleShare} variant="tertiary">
      Поделиться
    </Button>
  );
};
