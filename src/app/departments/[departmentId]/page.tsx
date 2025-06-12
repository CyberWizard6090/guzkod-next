import { Block } from 'shared/ui/block';
import { SimpleRichText } from 'shared/ui/blocks';
import { EmployeeList } from 'widgets/employee-list';
// import './departmentPage.scss';

import { getDepartmentById } from 'shared/api/departments';
import { Page } from 'shared/ui/page';
import { ImageView } from 'shared/ui/image';

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
        <SimpleRichText body={data.description} />
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
