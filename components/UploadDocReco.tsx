"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  CloudUpload,
  Paperclip
} from "lucide-react"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "@/components/extension/file-input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { uploadFile } from "@/lib/actions/patient.actions"
import { account } from "@/lib/appwrite.config"

const formSchema = z.object({
  fileUpload: z.string().optional()
});

export default function UploadDocReco() {

  const [files, setFiles] = useState < File[] | null > (null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 10,
    multiple: true,
  };
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  async function onSubmit() {
    if (!files || files.length === 0) {
      toast.error("Please upload at least one file.");
      return;
    }
  
    try {
      const uploadedFileIds: string[] = [];
      const user = await account.get();
      const fullName = user.name;
  
      for (const file of files) {
        // Use the uploadFile function
        const fileId = await uploadFile(fullName, file);
        uploadedFileIds.push(fileId);
      }
  
      console.log("Uploaded files:", uploadedFileIds);
  
      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-xl bg-[#E2C044]  hover:bg-transparent duration-100 shadow-lg w-20 h-9">Upload</DialogTrigger>
        <DialogContent className="md:max-w-[600px] bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-2xl max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Update Doctor's Recommendation</DialogTitle>              <DialogDescription>
              Max file limit: 5; Max file size: 10MB
            </DialogDescription>

              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                    <FormField
                      control={form.control}
                      name="fileUpload"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select File</FormLabel>
                          <FormControl>
                            <FileUploader
                              value={files}
                              onValueChange={setFiles}
                              dropzoneOptions={dropZoneConfig}
                              className="relative bg-background rounded-lg p-2"
                            >
                              <FileInput
                                id="fileInput"
                                className="outline-dashed outline-1 outline-slate-500"
                              >
                                <div className="flex items-center justify-center flex-col p-8 w-full ">
                                  <CloudUpload className='text-gray-500 w-10 h-10' />
                                  <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span>
                                    &nbsp; or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    JPG, PNG, or PDF ONLY
                                  </p>
                                </div>
                              </FileInput>
                              <FileUploaderContent>
                                {files &&
                                  files.length > 0 &&
                                  files.map((file, i) => (
                                    <FileUploaderItem key={i} index={i}>
                                      <Paperclip className="h-4 w-4 stroke-current" />
                                      <span>{file.name}</span>
                                    </FileUploaderItem>
                                  ))}
                              </FileUploaderContent>
                            </FileUploader>
                          </FormControl>
                          <FormDescription>Click the trash icon if you want to select a different file</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col gap-4">
                      <Button type="submit" className="bg-[#E2C044] rounded-xl">Submit</Button>
                    </div>
                  </form>
                </Form>
              </div>

            </DialogHeader>
          </DialogContent>
        </Dialog>
  )
}