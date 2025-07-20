import { getPageById } from 'shared/api/pages';
import { getArticleById } from 'shared/api/articles';

export async function fetchPageTitle(pageId: string): Promise<string | null> {
  try {
    const page = await getPageById(pageId);
    return page.namepage || null;
  } catch {
    return null;
  }
}

export async function fetchArticleTitle(articleId: string): Promise<string | null> {
  try {
    const article = await getArticleById(articleId);
    return article.title || null;
  } catch {
    return null;
  }
}
