import type { ReactElement } from "react";

type Props = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  selectedPositions: Set<string>;
  onPositionToggle: (position: string) => void;
  selectedSkills: Set<string>;
  onSkillToggle: (skill: string) => void;
};

const POSITIONS = [ "Frontend Engineer", "Backend Engineer", "SRE" ];
const SKILLS = [ "TypeScript", "Go", "Kotlin" ];

export const JobSearchFilter = ({
  keyword,
  onKeywordChange,
  selectedPositions,
  onPositionToggle,
  selectedSkills,
  onSkillToggle,
}: Props): ReactElement => (
  <aside className="flex flex-col gap-6 p-4 bg-gray-50 rounded-lg min-w-64">
    {/* Keyword Search */}
    <div className="flex flex-col gap-2">
      <label htmlFor="keyword" className="font-semibold text-gray-700">
        Keyword
      </label>
      <input
        id="keyword"
        type="text"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="Search jobs..."
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Positions Drawer */}
    <details className="group">
      <summary className="font-semibold text-gray-700 cursor-pointer hover:text-blue-600 flex items-center gap-2">
        <span className="inline-block transition-transform group-open:rotate-90">▶</span>
        Positions
      </summary>
      <div className="mt-3 ml-6 flex flex-col gap-2">
        {POSITIONS.map((position) => (
          <label key={position} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedPositions.has(position)}
              onChange={() => onPositionToggle(position)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700">{position}</span>
          </label>
        ))}
      </div>
    </details>

    {/* Skills Drawer */}
    <details className="group">
      <summary className="font-semibold text-gray-700 cursor-pointer hover:text-blue-600 flex items-center gap-2">
        <span className="inline-block transition-transform group-open:rotate-90">▶</span>
        Skills
      </summary>
      <div className="mt-3 ml-6 flex flex-col gap-2">
        {SKILLS.map((skill) => (
          <label key={skill} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSkills.has(skill)}
              onChange={() => onSkillToggle(skill)}
              className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700">{skill}</span>
          </label>
        ))}
      </div>
    </details>
  </aside>
);
