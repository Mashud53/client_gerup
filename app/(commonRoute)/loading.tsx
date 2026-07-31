import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Loading = () => {
    return (
        <div className='animate-pulse grid grid-cols-1 md:grid-cols-3 gap-4 '>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
                {/* Image placeholder */}
                <div className="h-48 bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative">
                    <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
                       
                    </div>

                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-sm truncate"></h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">

                            </p>
                        </div>
                        <Badge className="whitespace-nowrap">
                            
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        
                        <Badge variant="outline" className="text-xs">
                          
                        </Badge>
                    </div>

                </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
                {/* Image placeholder */}
                <div className="h-48 bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative">
                    <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
                       
                    </div>

                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-sm truncate"></h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">

                            </p>
                        </div>
                        <Badge className="whitespace-nowrap">
                            
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        
                        <Badge variant="outline" className="text-xs">
                          
                        </Badge>
                    </div>

                </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
                {/* Image placeholder */}
                <div className="h-48 bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center relative">
                    <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
                       
                    </div>

                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-sm truncate"></h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">

                            </p>
                        </div>
                        <Badge className="whitespace-nowrap">
                            
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        
                        <Badge variant="outline" className="text-xs">
                          
                        </Badge>
                    </div>

                </CardContent>
            </Card>
            
        </div>
    );
};

export default Loading;