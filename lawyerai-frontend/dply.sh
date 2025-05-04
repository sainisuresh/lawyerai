#!/bin/sh

echo "🚀 Starting deployment of legal drafts UI..."

BASE_DIR="./app/legal-drafts"

# List of [path|description]
drafts_list='
court/petition|Used to request a formal legal action from a court.
court/plaint|Initiates a civil lawsuit.
court/written-statement|Reply filed by defendant in civil case.
court/affidavit|Sworn statement used as evidence in court.
court/poa-for-litigation|Gives power to represent someone in legal proceedings.
court/summons|Order to appear before court.
court/warrant|Authorization for arrest or search.
court/judgment|Decision by a judge or court.
court/decree|Official order that resolves the case.
court/bail-application|Request to release an accused on bail.
court/writ-petition|Request enforcement of fundamental rights.
court/writ-petition/habeas-corpus|Seeks release of a person illegally detained.
court/writ-petition/mandamus|Directs public authority to perform duty.
court/writ-petition/certiorari|Quashes illegal order of a lower court.
court/writ-petition/prohibition|Stops lower court from exceeding its jurisdiction.
court/writ-petition/quo-warranto|Challenges right to hold a public office.
business/contract/employment-contract|Defines relationship between employer and employee.
business/franchise-agreements|Governs brand-based business permissions.
business/gst-registration|Used for tax compliance and invoicing.
'

# Format component names
format_component_name() {
  echo "$1" | tr '-' ' ' | awk -F/ '{print $NF}' | awk '{for (i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2);}1' | tr ' ' '_'
}

# Save all paths into a temp file to build index pages later
TMP_PATHS=$(mktemp)
echo "$drafts_list" | while IFS='|' read -r path desc; do
  echo "$path|$desc" >> "$TMP_PATHS"
done

# Create individual pages
while IFS='|' read -r path desc; do
  [ -z "$path" ] && continue

  label=$(basename "$path" | tr '-' ' ' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
  component_name=$(format_component_name "$path")
  full_path="$BASE_DIR/$path"
  mkdir -p "$full_path"

  cat > "$full_path/page.tsx" <<EOF
"use client";

export default function ${component_name}Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50 text-center">
      <h1 className="text-2xl font-bold mb-4">📄 $label Draft</h1>
      <p className="text-gray-700 max-w-xl">$desc</p>
    </div>
  );
}
EOF
  echo "✅ Created $path/page.tsx"
done < "$TMP_PATHS"

# Now build index pages for parent folders
# Collect all parent directories
parents=$(cut -d'/' -f1-2 "$TMP_PATHS" | sort | uniq)

for parent in $parents; do
  # Collect child pages of this parent (excluding the parent itself)
  children=$(grep "^$parent/" "$TMP_PATHS" | grep -v "^$parent|")

  if [ -n "$children" ]; then
    index_path="$BASE_DIR/$parent"
    mkdir -p "$index_path"

    cat > "$index_path/page.tsx" <<EOF
"use client";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">📚 Available Drafts</h1>
      <ul className="space-y-3 max-w-2xl mx-auto">
EOF

    echo "$children" | while IFS='|' read -r path desc; do
      name=$(basename "$path" | tr '-' ' ' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
      rel_path=$(basename "$path")
      echo "        <li><Link href=\"./$rel_path\" className=\"text-blue-600 hover:underline\">$name</Link></li>" >> "$index_path/page.tsx"
    done

    cat >> "$index_path/page.tsx" <<EOF
      </ul>
    </div>
  );
}
EOF
    echo "📂 Created index page for $parent"
  fi
done

rm "$TMP_PATHS"
echo "🎉 All legal drafts UI pages and indexes created successfully."

