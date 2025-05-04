#!/bin/bash

echo "📁 Creating directories..."

BASE_DIR="./app/legal-drafts"

CATEGORIES=(
  "property:Sale Deed:Title Deed:Encumbrance Certificate:Property Tax Receipts:Mutation Certificate:Lease Agreement:Gift Deed:Power of Attorney:Occupancy Certificate:Building Completion Certificate"
  "business:Partnership Deed:MoA:AoA:Shareholder Agreements:GST Registration:Trade License:Shops Registration:Employment Contracts:NDA:Franchise Agreements"
  "court:Petition:Plaint:Written Statement:Affidavit:POA for litigation:Summons:Warrant:Judgment:Decree:Bail Application"
  "finance:ITR:Form 16:Loan Agreements:Bank Statements:Investment Proofs:Insurance Policies"
  "misc:Will:Trust Deed:Adoption Deed:Surrogacy Agreement:Cybercrime Complaints:FIR:Anticipatory Bail Application:MoU"
)

mkdir -p "$BASE_DIR"

for category in "${CATEGORIES[@]}"; do
  IFS=':' read -r main_cat sub1 sub2 sub3 sub4 sub5 sub6 sub7 sub8 sub9 sub10 sub11 sub12 <<< "$category"
  MAIN_DIR="$BASE_DIR/$main_cat"
  mkdir -p "$MAIN_DIR"

  capitalized_cat="$(echo "${main_cat:0:1}" | tr '[:lower:]' '[:upper:]')${main_cat:1}"

  LINKS_JSX=""
  for sub in "${sub1}" "${sub2}" "${sub3}" "${sub4}" "${sub5}" "${sub6}" "${sub7}" "${sub8}" "${sub9}" "${sub10}" "${sub11}" "${sub12}"; do
    if [ -n "$sub" ]; then
      kebab=$(echo "$sub" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
      pascal_case=$(echo "$sub" | sed -E 's/(^| )([a-z])/\U\2/g' | tr -d ' ')
      DRAFT_DIR="$MAIN_DIR/$kebab"
      mkdir -p "$DRAFT_DIR"

      # Create subcategory draft page
      cat > "$DRAFT_DIR/page.tsx" <<EOF
"use client";

export default function ${pascal_case}Draft() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center text-xl p-4">
      <p>📄 ${sub} Draft Template – Coming Soon</p>
    </div>
  );
}
EOF

      # Create a link for this subcategory
      LINKS_JSX+="<li><a href=\"/legal-drafts/$main_cat/$kebab\" className=\"text-blue-600 hover:underline\">${sub}</a></li>
"
    fi
  done

  # Create main category index page with links
  cat > "$MAIN_DIR/page.tsx" <<EOF
"use client";
import Link from "next/link";

export default function ${capitalized_cat}DraftsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl font-bold mb-6">📂 ${capitalized_cat} Legal Drafts</h1>
      <ul className="space-y-2 text-lg">
        ${LINKS_JSX}
      </ul>
    </div>
  );
}
EOF

done

echo "✅ All legal drafts UI with subcategory links created!"

