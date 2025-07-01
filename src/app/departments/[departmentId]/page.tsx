import { Block } from 'shared/ui/block';
import { SimpleRichText } from 'shared/ui/blocks';
import { EmployeeList } from 'widgets/employee-list';
// import './departmentPage.scss';

import { getDepartmentById } from 'shared/api/departments';
import { Page } from 'shared/ui/page';
import { ImageView } from 'shared/ui/image';
import { EmptyPageStub } from 'shared/ui/empty-page-stub';

type Props = {
  params: { departmentId: string };
};

export default async function DepartmentPage({ params }: Props) {
  const data = await getDepartmentById(params.departmentId);
  return (
    <Page>
      <h1>{data.name}</h1>

      <Block>
        {data.image ? <ImageView url={data.image.sizes.tablet.url} /> : <></>}
        {data.description && data.description.length !== 0 ? (
          <SimpleRichText body={data.description} />
        ) : (
          <EmptyPageStub
            title={'Информация о подразделении'}
            description={
              'Описание данного подразделения пока не добавлено. Скоро здесь появится подробная информация о его деятельности и функциях.'
            }
          />
        )}
      </Block>
      {data.employee && (
        <>
          <h2>Сотрудники нашего отдела</h2>
          <EmployeeList List={data.employee} />
        </>
      )}
    </Page>
  );
}
