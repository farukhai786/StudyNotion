import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RxDropdownMenu,
  RxDragHandleHorizontal,
} from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import ConfirmationModal from "../../../../commen/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../servises/operation/CourseApi";
import { setCourse } from "../../../../../slices/courseSlice";

export default function NestedView({ handleChangeEditSectionName }) {
  /* ───────── RTK & state ───────── */
  const { course } = useSelector((s) => s.course);
  const { token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirm, setConfirm] = useState(null);


  const handleDeleteSection = async (sectionId) => {
    const res = await deleteSection({ sectionId, courseId: course._id }, token);
    if (res) dispatch(setCourse(res));
    setConfirm(null);
  };

  const handleDeleteSubSection = async (subId, sectionId) => {
    const updatedSection = await deleteSubSection(
      { subSectionId: subId, sectionId },
      token
    );
    if (updatedSection) {
      const updatedContent = course.courseContent.map((sec) =>
        sec._id === sectionId ? updatedSection : sec
      );
      dispatch(setCourse({ ...course, courseContent: updatedContent }));
    }
    setConfirm(null);
  };


  return (
    <div className="rounded-lg bg-[#2C333F] p-6">
      {course?.courseContent?.map((section) => (
        <details
          key={section._id}
          className="group rounded-md border border-white/10 mb-2"
          open
        >
      
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none text-gray-200 group-open:bg-white/10 rounded-md">
            <div className="flex items-center gap-2">
              <RxDragHandleHorizontal className="text-lg opacity-70" />
              <span className="font-medium">{section.sectionName}</span>
            </div>

            <div className="flex items-center gap-4 text-base">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeEditSectionName(section._id, section.sectionName);
                }}
                className="hover:text-[#FFD60A] transition cursor-pointer "
              >
                <MdEdit />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirm({
                    text1: "Delete this Section",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirm(null),
                  });
                }}
                className="hover:text-red-400 transition cursor-pointer"
              >
                <RiDeleteBin6Line />
              </button>

              {/* caret */}
              <BiChevronDown className="group-open:hidden text-xl" />
              <BiChevronUp className="hidden group-open:block text-xl" />
            </div>
          </summary>

          {/* SUBSECTION LIST */}
          <div className="pl-10 pr-4">
            {section?.subSection?.map((lec) => (
              <div
                key={lec._id}
                onClick={() => setViewSubSection(lec)}
                className="flex items-center justify-between border-b border-white/10 py-2 text-gray-300 hover:bg-white/5 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <RxDropdownMenu className="text-lg opacity-70" />
                  <span>{lec.title}</span>
                </div>

                <div
                  className="flex items-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() =>
                      setEditSubSection({ ...lec, sectionId: section._id })
                    }
                    className="hover:text-[#FFD60A] transition"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() =>
                      setConfirm({
                        text1: "Delete this Lecture",
                        text2: "This lecture will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(lec._id, section._id),
                        btn2Handler: () => setConfirm(null),
                      })
                    }
                    className="hover:text-red-400 transition"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}

       
            <button
              onClick={() => setAddSubSection({ sectionId: section._id })}
              className="flex items-center gap-2 text-[#FFD60A] mt-3 hover:underline cursor-pointer"
            >
              <AiOutlinePlus />
              <span>Add Lecture</span>
            </button>
          </div>
        </details>
      ))}

      {/* MODALS */}
      {(addSubSection || viewSubSection || editSubSection) && (
        <div className="fixed inset-0 bg-black/60 z-50 grid place-items-center backdrop-blur-sm">
          {addSubSection ? (
            <SubSectionModal
              modalData={addSubSection}
              setmodalData={setAddSubSection}
              add
            />
          ) : viewSubSection ? (
            <SubSectionModal
              modalData={viewSubSection}
              setmodalData={setViewSubSection}
              view
            />
          ) : (
            <SubSectionModal
              modalData={editSubSection}
              setmodalData={setEditSubSection}
              edit
            />
          )}
        </div>
      )}

      {confirm && <ConfirmationModal modalData={confirm} />}
    </div>
  );
}
