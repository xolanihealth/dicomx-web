import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import UilExpandArrows from '@iconscout/react-unicons/icons/uil-expand-arrows';
import { Row, Col } from 'antd';
import NoteCard from '../../../components/note/Card';
import { noteDragData } from '../../../redux/note/actionCreator';

const DragHandle = sortableHandle(() => (
  <UilExpandArrows className="w-4 h-4 text-body dark:text-white60 cursor-move" />
));
const SortableItem = SortableElement(({ value }) => (
  <Col xxl={8} xl={12} lg={12} sm={12} xs={24} key={value.key}>
    <NoteCard Dragger={DragHandle} data={value} />
  </Col>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <Row gutter={24}>
      {items
        .filter((item) => item.label === 'important')
        .map((value, index) => (
          <SortableItem key={`item-${value.key}`} index={index} value={value} />
        ))}
    </Row>
  );
});

function Important() {
  const dispatch = useDispatch();
  const { noteData } = useSelector((state) => {
    return {
      noteData: state.Note.data,
    };
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(
      noteDragData(
        arrayMoveImmutable(
          [
            ...noteData.filter((item) => item.label === 'important'),
            ...noteData.filter((item) => item.label !== 'important'),
          ],
          oldIndex,
          newIndex,
        ),
      ),
    );
  };
  return (
    <div className="h-full bg-white dark:bg-white10 m-0 text-theme-gray dark:text-white60 text-[15px] rounded-10 relative">
      <div className="text-dark dark:text-white87 flex flex-wrap items-center justify-between gap-[15px] sm:justify-center py-[18px] mb-0 border-b border-regular dark:border-whiteDark">
        <h1 className="px-[25px] mb-0 inline-block overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold sm:text-center">
          Task Lists
        </h1>
      </div>
      <div className="p-[25px] sm:p-[15px]">
        <SortableList useDragHandle axis="xy" items={noteData} onSortEnd={onSortEnd} />
      </div>
    </div>
  );
}

export default Important;
