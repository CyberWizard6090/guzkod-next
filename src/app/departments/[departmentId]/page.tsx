import { Block } from 'shared/ui/block';
import { SimpleRichText } from 'shared/ui/blocks';
import { EmployeeList } from 'widgets/employee-list';

import { getDepartmentById } from 'shared/api/departments';
import { VerticalContainer } from 'shared/ui/vertical-container';
import { ImageView } from 'shared/ui/image';
import { EmptyState } from 'shared/ui/empty-state';

type PageParams = {
  departmentId: string;
};

const DepartmentPage = async ({ params }: { params: Promise<PageParams> }) => {
  const { departmentId } = await params;
  const data = await getDepartmentById(departmentId);
  return (
    <VerticalContainer>
      <h1>{data.name}</h1>

      <Block>
        {data.image ? <ImageView url={data.image.sizes.tablet.url} /> : <></>}
        {data.description && data.description.length !== 0 ? (
          <SimpleRichText body={data.description} />
        ) : (
          <EmptyState
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
    </VerticalContainer>
  );
};
export default DepartmentPage;
